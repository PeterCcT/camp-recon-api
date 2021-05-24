CONTAINER_NAME="camp_dev_postgres_db"

CONTAINER_ALREADY_EXIST=$(docker ps -a | grep -q $CONTAINER_NAME;echo $?)

if [ $CONTAINER_ALREADY_EXIST -eq 0 ]; then
    echo "Initializing $CONTAINER_NAME container"
    docker start $CONTAINER_NAME
else 
    docker run \
        --name $CONTAINER_NAME \
        -e POSTGRES_PASSWORD=${DBPASSWORD:-dev} \
        -e POSTGRES_USER=${DBUSER:-dev} \
        -p ${DBPORT:-5432}:5432 \
        -v $pwd/src/datbase/:/var/lib/postgresql/data \
    postgres    
fi
