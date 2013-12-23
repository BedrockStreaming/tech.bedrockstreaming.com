m6web.github.io
===============

M6Web Tech Blog

#### Installation 

```shell
git clone https://github.com/M6Web/m6web.github.io.git
cd m6web.github.io
npm install
grunt
jekyll build
jekyll serve --watch --config \_config.yml,\_config_dev.yml
```

#### or via Vagrant

```shell
git clone https://github.com/M6Web/m6web.github.io.git
cd m6web.github.io/vagrant
vagrant up
vagrant ssh
cd jekyll
jekyll serve --watch --config \_config.yml,\_config_dev.yml
```