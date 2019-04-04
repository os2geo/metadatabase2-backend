module.exports = async app => {
  const service = app.service('roles');
  const roles = await service.find({
    query: {
      $limit: 0
    },
    paginate: {
      default: 5,
      max: 25
    }
  });
  if(roles.total===0) {
    await service.create([
      {
        name: 'System',
      },
      {
        name: 'Administrator',
      },
      {
        name: 'User',
      },
    ]);
  }
};
