Build dependencies
docker build . -f docker/oursocial-dependencies.dockerfile -t oursocial.azurecr.io/oursocial-dependencies:latest
docker push oursocial.azurecr.io/oursocial-dependencies:latest
