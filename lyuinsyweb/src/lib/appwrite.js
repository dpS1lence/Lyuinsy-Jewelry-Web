import { Client, Databases, ID, Query } from "appwrite";

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  itemsCollectionId: import.meta.env.VITE_APPWRITE_ITEMS_COLLECTION_ID,
  collectionsCollectionId: import.meta.env.VITE_APPWRITE_COLLECTIONS_COLLECTION_ID,
  collectionsEmailId: import.meta.env.VITE_APPWRITE_EMAIL_COLLECTION_ID,
  collectionsOrders: import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID,
};

// Log the appwriteConfig to the console
console.log("Appwrite Configuration:", appwriteConfig);

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

export async function saveEmail({email, date}){
  try {
    const item = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionsEmailId,
      ID.unique(),
      {
        email,
        date
      }
    );

    return item;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export async function createOrder({userNames, userAdress, userPhone, userEmail, totalPrice, promoCode, itemIds}){
  try {
    
    const item = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionsOrders,
      ID.unique(),
      {
        itemIds,
        userNames,
        userAdress,
        userPhone,
        userEmail,
        totalPrice,
        promoCode
      }
    );

    return item;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Get all items
export async function getAllItems(limit = 10, offset = 0) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export async function getOneItem(id) {
  try {
    const item = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId,
      id
    );
    return item;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
};

export async function getOneItemBySlug(slug) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId,
      [Query.equal("slug", slug)]
    );

    if (response.documents.length === 0) {
      throw new Error("Item not found");
    }

    return response.documents[0]; // Return the first match
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}

export async function getOneCollectionBySlug(slug) {
  try {
    if (slug === "all") {
      const items = await getAllItems(300, 0);
      return {
        name: "Всички бижута",
        items: items
      };
    }

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionsCollectionId,
      [Query.equal("slug", slug)]
    );

    if (response.documents.length === 0) {
      throw new Error("Item not found");
    }

    const items = await getAllItems(300, 0);
    
    if (response) {
      response.documents[0].items = items.filter(item => item.relatedCollection === response.documents[0].$id);
    }

    return response.documents[0]; // Return the first match
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}



export async function getAllCollections() {
  try {
    const collections = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionsCollectionId
    );

    return collections.documents;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export async function getOneCollection(id) {
  try {
    const collections = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionsCollectionId
    );

    // Filter the collections to find the one with the given id
    const collection = collections.documents.find(collection => collection.$id === id);
    console.log(collection);
    // Fetch all items
    const items = await getAllItems(300, 0);
    console.log(items);
    
    // Add 'items' attribute to the collection with an array of items that belong to this collection
    if (collection) {
      collection.items = items.filter(item => item.relatedCollection === collection.$id);
    }
    
    return collection || null; // Return the found collection or null if not found
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};

export const purchaseItem = async (itemId) => {
  try {
    const item = await getOneItem(itemId);
    console.log(item);
    console.log(itemId);
    console.log(item.quantity);
    if (item && item.quantity > 0) {
      await updateItem(itemId, { quantity: item.quantity - 1 }); // Decrement quantity by 1
      console.log("Item quantity updated successfully");
    } else {
      console.error("Item not found or quantity is zero");
    }
  } catch (error) {
    console.error("Error purchasing item:", error);
  }
};

export const updateItem = async (itemId, updatedData) => {
  try {
    console.log("Updating item with ID:", itemId);
    let image = null;

    // If there's a new image, upload it first
    if (updatedData.imageFile) {
      const { fileUrl } = await uploadFile(updatedData.imageFile);
      image = fileUrl;
    }

    // Update the item document
    const updatedItem = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId,
      itemId,
      {
        name: updatedData.name,
        description: updatedData.description,
        old_price: updatedData.oldPrice,
        actual_price: updatedData.actualPrice,
        discount: updatedData.discount,
        bulletsDescription: updatedData.bulletsDescription || [],
        special_offer: updatedData.specialOffer,
        quantity: updatedData.quantity,
        ...(image && { image }), // Only include image if a new image was uploaded
      }
    );

    return updatedItem;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};