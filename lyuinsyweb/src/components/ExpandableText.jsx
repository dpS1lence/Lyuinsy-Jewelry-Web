import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function ExpandableText({ text, maxHeight = 300 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const textRef = useRef(null);

  // Measure the full height of the text content after render.
  useEffect(() => {
    if (textRef.current) {
      setFullHeight(textRef.current.scrollHeight);
    }
  }, [text]);

  return (
      <motion.div
        animate={{ height: isExpanded ? `${fullHeight}px` : `${maxHeight}px` }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
        className='relative mb-6 max-h-fit'
      >
        <p ref={textRef} className="text-base md:text-lg text-text mb-3">
          {text}
        </p>
        
      {/* Gradient overlay (only when collapsed) */}
      {fullHeight > maxHeight && !isExpanded && (
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      )}
      {/* Toggle button appears if the content is taller than maxHeight */}
      {fullHeight > maxHeight && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-0 z-10 text-sm text-discount mt-2 h-5 focus:outline-none"
        >
          {isExpanded ? 'Скрий' : 'Прочети още'}
        </button>
      )}
      </motion.div>
  );
}

export default ExpandableText;
