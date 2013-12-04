#!/usr/bin/env bash
sudo add-apt-repository ppa:chris-lea/node.js  

sudo apt-get update

sudo apt-get install python-software-properties

sudo apt-get -y install build-essential 
sudo apt-get -y install rubygems

sudo apt-get -y install nodejs

sudo apt-get -y install libgemplugin-ruby

sudo gem install json
sudo gem install jekyll rdiscount --no-ri --no-rdoc

curl https://npmjs.org/install.sh | sudo sh
sudo npm install -g grunt-cli

npm install
grunt
jekyll build