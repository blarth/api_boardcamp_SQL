#!/bin/bash

checkPostgres () {
  if [[ $(id -u postgres 2> /dev/null) = "" ]]; then
    echo "Parece que o postgres não está instalado!";
    echo "Execute: sudo apt update && sudo apt install postgresql postgresql-contrib";
    exit;
  fi

  if [[ $(pgrep -u postgres -fa -- -D) = "" ]]; then
    echo "PostgreSQL não está sendo executado, tentando iniciar...";
    sudo service postgresql start;
  fi
}

createDatabase () {
  sudo su -c "psql -c \"CREATE DATABASE $1\";" postgres;
}

destroyDatabase () {
  sudo su -c "psql -c \"DROP DATABASE $1\";" postgres;
}

runScripts () {
  for f in scripts/*; do
    echo "Executando script $f...";
    sudo su -c "psql -d $1 -f $f" postgres;
  done
}

enterPostgresCli () {
  sudo su -c "psql -d $1" postgres;
}
