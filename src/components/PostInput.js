import React, { useState } from 'react';
import airtableConfig from './Airtable';

// Suppressed PropTypes in ESLint with comment
/* eslint react/prop-types: 0 */

// airtable configuration
const Airtable = require('airtable');

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const createPost = function (body, author) {
  base('Posts').create([
    {
      fields: {
        Body: body,
        Author: author,
      },
    },
  ], (err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach((record) => {
      console.log(record.getId());
    });
  });
};

const PostInput = function () {
  const [value, setValue] = useState('');
  const handleChange = function (event) { setValue(event.target.value); };
  const handleSubmit = function (event) {
    event.preventDefault();
    // Send to Airtable base What&apos;s happening
    createPost(value, 'Dan');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="PostInput">
      <label htmlFor="textarea">
        <textarea value={value} onChange={handleChange} placeholder="What's happening" />
      </label>
      <input type="submit" value="Print" />
    </form>
  );
};

export default PostInput;
