// src/components/DocumentForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const DocumentForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const mutation = useMutation(async (data: { title: string; content: string; tags: string[] }) => {
    const response = await fetch("/api/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error creating document");
    }
    return response.json();
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      await mutation.mutateAsync({ title, content, tags: tagsArray });
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="tags">Tags (comma separated):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DocumentForm;
