import React, { useState, useEffect } from 'react';
import Post from './Post';
import airtableConfig from './Airtable';

// Suppressed PropTypes in ESLint with comment
/* eslint react/prop-types: 0 */

// airtable configuration
const Airtable = require('airtable');

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const getPosts = (setRecords) => {
  base('Posts').select({
    view: 'Grid view',
  }).firstPage((err, records) => {
    if (err) { console.log(err); }
    console.log(records);
    setRecords(records);
  });
};

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

const PostDisplay = function () {
  const [records, setRecords] = useState([]);

  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = function (event) { setValue(event.target.value); };
  const handleSubmit = function (event) {
    event.preventDefault();
    // Send to Airtable base What&apos;s happening
    createPost(value, 'Dan');
    setValue('');
    setSubmitted(true);
    setSubmitted(false);
  };

  useEffect(() => {
    getPosts(setRecords);
  }, [submitted, records]);
  console.log(records, 'this');

  records.forEach((record) => { console.log(record.Body); });

  const Posts = records.map((record) => (
    <Post
      body={record.get('Body')}
      author={record.get('Author')}
    />
  ));

  return (
    <div>
      <form onSubmit={handleSubmit} className="PostInput">
        <label htmlFor="textarea">
          <textarea value={value} onChange={handleChange} placeholder="What's happening" />
        </label>
        <input type="submit" value="Print" />
      </form>
      <div className="PostDisplay">
        {Posts}
      </div>
    </div>
  );
};
/*

console.log(base('Posts')); // so that we can compile

base('Posts').select({
  view: 'Grid view',
}).eachPage((records, fetchNextPage) => {
  records.forEach((record) => {
    console.log('Retrieved', record.get('Body'));
  });

  fetchNextPage();
}, (err) => {
  if (err) { console.log(err); }
});
*/
export default PostDisplay;
