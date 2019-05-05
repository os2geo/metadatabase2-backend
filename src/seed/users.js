module.exports = async app => {
  const service = app.service('users');
  const res = await service.find({
    query: {
      email: 'admin',
    }
  });
  if(res.total===0) {
    await service.create({
      name: 'Administrator',
      email: 'admin',
      password: '1234',
      roleId: 1,
      isVerified: true
    });
  }
};
