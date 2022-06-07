FROM ruby:3

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
COPY type-on-strap.gemspec type-on-strap.gemspec
RUN gem install jekyll bundler
RUN bundle install --jobs 4 --retry 3

EXPOSE 8080
EXPOSE 35729
CMD bundle exec jekyll serve --source . --destination /var/_site/ --host 0.0.0.0 --port 8080 --livereload --livereload-port 35729
