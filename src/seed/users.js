module.exports = async app => {
  const service = app.service('users');
  const users = await service.find({
    query: {
      email: 'admin'
    }
  });
  if(users.length===0) {
    await service.create({
      name: 'Administrator',
      email: 'admin',
      password: '1234',
      roleId: 1
    });
  }
};
