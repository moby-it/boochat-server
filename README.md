Build dependencies
docker build . -f docker/oursocial-dependencies.dockerfile -t oursocial.azurecr.io/oursocial-dependencies:latest
docker push oursocial.azurecr.io/oursocial-dependencies:latest

example message
{
"sender":"622bb315409925be7d1018fe",
"content":"Sometimes I feel very sad when you cry",
"room": {
"name":"Silver lining",
"userIds":[
"622bb315409925be7d1018fe",
"622bb37b409925be7d10194b"
]
}
}

Rooms.service -> findRoomsByUserId-> need to count the message that are sent AFTER the last visit
