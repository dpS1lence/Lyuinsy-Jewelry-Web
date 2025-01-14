import { Client, Databases, ID, Storage } from "appwrite";

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  itemsCollectionId: import.meta.env.VITE_APPWRITE_ITEMS_COLLECTION_ID,
  collectionsCollectionId: import.meta.env.VITE_APPWRITE_COLLECTIONS_COLLECTION_ID,
};

// Log the appwriteConfig to the console
console.log("Appwrite Configuration:", appwriteConfig);

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);
const storage = new Storage(client);

// Upload file to storage
export async function uploadFile(file) {
  if (!file || !file.name) return null;

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      uploadedFile.$id,
      2000,
      2000,
      "top",
      100
    );

    return {
      fileId: uploadedFile.$id,
      fileUrl,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Create a new item
export async function createItem({ name, description, oldPrice, actualPrice, discount, bulletsDescription, specialOffer, imageFile }) {
  try {
    // First upload the image
    const { fileUrl } = await uploadFile(imageFile);

    // Then create the item document
    const item = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId,
      ID.unique(),
      {
        name,
        description,
        old_price: oldPrice,
        actual_price: actualPrice,
        discount,
        bullets_description: bulletsDescription || [],
        special_offer: specialOffer,
        image: fileUrl,
      }
    );

    return item;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

// Get all items
export async function getAllItems() {
  try {
    const items = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId
    );
    
    return items.documents;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export async function getOneItem(id) {
  try {
    const items = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId
    );

    // Filter the collections to find the one with the given id
    const item = items.documents.find(item => item.$id === id);
    
    return item || null; // Return the found collection or null if not found
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
}

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
    const items = await getAllItems();
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
}

export const deleteItem = async (itemId) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itemsCollectionId,
      itemId
    );
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
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
        bullets_description: updatedData.bulletsDescription || [],
        special_offer: updatedData.specialOffer,
        ...(image && { image }), // Only include image if a new image was uploaded
      }
    );

    return updatedItem;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};
