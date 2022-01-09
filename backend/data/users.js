import bcrypt from 'bcryptjs';
const users = [
	{
		name: 'John Wick',
		email: 'JohnWick@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Emma Watson',
		email: 'emmawatson@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'Daniel Radcliffe',
		email: 'danielradcliffe@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'Rupert Grint',
		email: 'rupertgrint@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
];

export default users;
