FROM ubuntu:20.04

RUN apt-get update
RUN apt install -y git curl autoconf bison build-essential \
    libssl-dev libyaml-dev libreadline6-dev zlib1g-dev \
    libncurses5-dev libffi-dev libgdbm6 libgdbm-dev libdb-dev
RUN curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

RUN echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> /root/.bashrc
RUN echo 'eval "$(rbenv init -)"' >> /root/.bashrc

RUN /root/.rbenv/bin/rbenv install 2.7.3
RUN /root/.rbenv/bin/rbenv global 2.7.3

RUN /root/.rbenv/shims/gem install bundler

RUN mkdir -p /var/content/
WORKDIR /var/content/

COPY Gemfile /var/content/Gemfile
COPY Gemfile.lock /var/content/Gemfile.lock
RUN /root/.rbenv/shims/bundle install --system --jobs 4 --retry 3

EXPOSE 8080
EXPOSE 35729
CMD /root/.rbenv/shims/bundle exec jekyll serve --source /var/content/ --destination /var/_site/ --host 0.0.0.0 --port 8080 --livereload --livereload-port 35729
