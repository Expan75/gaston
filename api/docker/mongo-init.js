db.createUser(
  {
      user: "gaston",
      pwd: "password",
      roles: [
          {
              role: "readWrite",
              db: "gaston"
          }
      ]
  }
);