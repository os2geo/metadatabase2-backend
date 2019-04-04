const databasesSeed = require('./databases');
const nano = require('nano')({
  url : 'http://admin:wont775dock@geo.os2geo.dk/couchdb',
  parseUrl : false
});
module.exports = async app => {
  const serviceOrganizations = app.service('organizations');
  const organizations = await serviceOrganizations.find({
    query: {
      $limit: 0
    },
    paginate: {
      default: 5,
      max: 25
    }
  });
  console.log('organizations', organizations);
  const serviceDatabases = app.service('databases');
  const databases = await serviceDatabases.find({
    query: {
      $limit: 0
    },
    paginate: {
      default: 5,
      max: 25
    }
  });
  console.log('databases', databases);
  if(databases.total === 0) {
    const adminDb = nano.db.use('admin');
    let res = await adminDb.view('organization', 'organizations');
    for(let organization of res.rows) {
      if(organizations.total === 0){
        let logo = null;
        try {
          logo = await adminDb.attachment.get(organization.id, 'logo');
        }
        catch(err) {
          console.log('error logo', organization.value.name);
        }
        try {

          await serviceOrganizations.create({
            id: organization.id,
            name: organization.value.name,
            logo
          });

        } catch(err) {
          console.log('error create organization', organization.value.name);
        }
      }
      let res2 = {};
      try{
        res2 = await adminDb.view('organization', 'databases', {
          key: organization.id
        });
      }catch(err) {
        console.log('error organization databases', organization.value.name);
      }
      for(let doc of res2.rows) {
        const db = nano.db.use(`db-${doc.id}`);
        let schema = null;
        try{
          schema = await db.get('_design/schema');
        } catch(err) {
          console.log('error _design/schema', doc.id);
        }
        try {
          await serviceDatabases.create({
            id: doc.id,
            name: doc.value,
            schema: schema && schema.schema ? schema.schema : null,
            organizationId: doc.key
          });
        } catch(err) {
          console.log('error create database', doc.value);
        }

        //console.log(schema);
      }
    }
  }
  //app.configure(databasesSeed);
};
