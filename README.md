# Where Are You application Backend

This creates a simple rest service in nodejs which is hugely influenced by [Brad's
Bookstore sample application](https://github.com/bradtraversy/bookstore). Great job Brad!

The endpoints are:

### Create User
POST `http://localhost:3000/api/user`
```
{
	"first_name": "James",
	"last_name": "Bond",
	"email": "james@dummy.com",
	"sha1": "b007",
	"enable": "false"
}
```

### Get User
GET `http://localhost:3000/api/user/b007`

### Update User
PUT `http://localhost:3000/api/user/james@dummy.com`
```
{
	"first_name": "James",
	"last_name": "Bond",
	"email": "james@dummy.com",
	"sha1": "b007",
	"enable": "true"
}
```

### Delete User
DELETE `http://localhost:3000/api/user/b007`

### Create Location
POST `http://localhost:3000/api/location/b007`
```
{
	"sha1": "b007",
	"latitude": "21.30435454",
	"longitude": "45.4556234"
}
```

### Get Location
GET `http://localhost:3000/api/location/b007`

### Get Location by minute value
GET `http://localhost:3000/api/location/b007/21`
where, 21 is the minute value
