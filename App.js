import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [alignment, setAlignment] = useState('left'); 
  const [fontSize, setFontSize] = useState(''); 
  const [underlineActive, setUnderlineActive] = useState(false); 
  
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    document.execCommand('fontSize', false, e.target.value); 
  }
  
  const handleUnderlineClick = () => {
    document.execCommand('underline');
    setUnderlineActive(!underlineActive);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleBoldClick = () => {
    document.execCommand('bold');
    setBoldActive(!boldActive);
  };

  const handleItalicClick = () => {
    document.execCommand('italic');
    setItalicActive(!italicActive);
  };

  const handleOrderedListClick = () => {
    document.execCommand('insertOrderedList');
  };

  const handleUnorderedListClick = () => {
    document.execCommand('insertUnorderedList');
  };

  const handleTogglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleInsertVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoUrl(reader.result);
        const video = `<video controls src="${reader.result}" alt="Video"></video>`;
        document.execCommand('insertHTML', false, video);
      };
      reader.readAsDataURL(file);

       


    }
   
    e.target.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Question:', question);
    console.log('Content:', content);
    console.log('Video URL:', videoUrl);
   
    setQuestion('');
    setContent('');
    setVideoUrl('');
    
    toast.success('Question submitted successfully!');
  };

  const handlePostCode = () => {
    const code = prompt('Enter the source code:');
    if (code) {
      const codeBlock = `<pre><code>${code}</code></pre>`;
      setContent(content + codeBlock);
    }
  };

  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value);
    document.execCommand('justify' + e.target.value); 
  };

  return (
    <div className="App">
      <h1>Ask Questions</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type your question here..."
          value={question}
          onChange={handleQuestionChange}
        ></textarea>
        <input type="file" accept="video/*" onChange={handleInsertVideo} />
        <button type="submit">Post Question</button>
      </form>
      <h2>Rich Text Editor</h2>
      <div className="editor">
        <div className="toolbar">
          <button onClick={handleBoldClick} className={boldActive ? 'active' : ''}>
            Bold
          </button>
          <button onClick={handleItalicClick} className={italicActive ? 'active' : ''}>
            Italic
          </button>
          <button onClick={handleOrderedListClick}>Ordered List</button>
          <button onClick={handleUnorderedListClick}>Unordered List</button>
          <button onClick={handleTogglePreview}>{previewMode ? 'Editor Mode' : 'Preview Mode'}</button>
          <button onClick={handlePostCode}>Post Code</button>
          <label htmlFor="videoUpload">Upload Video</label>
          <input type="file" id="videoUpload" accept="video/*" onChange={handleInsertVideo} style={{ display: 'none' }} />
         
          
          <select   className="font-size-dropdown"       onChange={handleAlignmentChange} value={alignment}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
          <select onChange={handleFontSizeChange} value={fontSize}>
            <option value="">Font Size</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <button onClick={handleUnderlineClick} className={underlineActive ? 'active' : ''} >
            Underline
          </button>
        </div>
        <div className={previewMode ? 'preview-content' : 'content'} contentEditable={!previewMode}>
          {videoUrl && <video controls src={videoUrl} alt="Video"></video>}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
