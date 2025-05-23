FROM ruby:3.1

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
COPY type-on-strap.gemspec type-on-strap.gemspec

RUN gem install bundler -v 2.3.16
RUN gem install jekyll -v 4.3.3
RUN bundle install

EXPOSE 8080
EXPOSE 35729
CMD ["bundle", "exec", "jekyll", "serve", "--source", ".", "--destination", "/var/_site/", "--host", "0.0.0.0", "--port", "8080", "--livereload", "--livereload-port", "35729"]
