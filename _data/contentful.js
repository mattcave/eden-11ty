const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
});

module.exports = function() {
  return client.getEntries({ content_type: 'jobPosting', order: 'sys.createdAt' })
  .then(function(response) {
    const data = {};
    data.jobPostings = response.items
    .map(function(jobPosting) {
      // page.fields.date= new Date(page.sys.updatedAt);
      jobPosting.fields.jobLocation = jobPosting.fields.jobLocation.fields.name;
      return jobPosting.fields;
    });
    return data;
  })    
  .catch(console.error);
};