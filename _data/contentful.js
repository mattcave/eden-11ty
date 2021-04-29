const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
});

module.exports = function() {

  let data = {};

  let locationPromise = client.getEntries({ content_type: 'location', order: 'sys.createdAt' })
  .then(function(response) {
    const locations = response.items
    .map(function(location) {
      location.fields.date= new Date(location.sys.updatedAt);
      return location.fields;
    });
    data.locations = locations;
    return locations;
  })
  .catch(error => console.error(`Error getting data from Contentful ${JSON.stringify(error)}`));

  let jobPostingPromise = client.getEntries({ content_type: 'jobPosting', order: 'sys.createdAt' })
  .then(function(response) {
    const jobPostings = response.items
    .map(function(jobPosting) {
      jobPosting.fields.date= new Date(jobPosting.sys.updatedAt);
      jobPosting.fields.jobLocation = jobPosting.fields.jobLocation.fields.name;
      return jobPosting.fields;
    });
    data.jobPostings = jobPostings;
    return jobPostings;
  })
  .catch(error => console.error(`Error getting data from Contentful ${JSON.stringify(error)}`));

  return Promise.all([locationPromise, jobPostingPromise])
  .then(function(result) {
    return (data)
  })
  .catch(error => console.error(`Error getting data from Contentful ${JSON.stringify(error)}`));
};


