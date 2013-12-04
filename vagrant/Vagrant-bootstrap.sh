#!/usr/bin/env bash

sudo apt-get update
sudo apt-get -y install python-software-properties

sudo add-apt-repository ppa:chris-lea/node.js  

sudo apt-get update

sudo apt-get -y install build-essential 
sudo apt-get -y install rubygems

sudo apt-get -y install nodejs

sudo apt-get -y install libgemplugin-ruby

sudo gem install bundler
cd jekyll
bundle install

sudo npm install -g grunt-cli

npm install
grunt
jekyll build