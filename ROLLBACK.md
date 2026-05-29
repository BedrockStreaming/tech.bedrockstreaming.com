# Rollback Procedure

If issues are discovered AFTER the Astro cutover, rollback is a single commit:

```bash
git log --oneline | grep cutover  # find the cutover commit SHA
git revert <cutover-sha>
git push origin master
```

The cutover is an ATOMIC commit specifically designed for easy rollback.
The Jekyll workflows will be restored and the site will resume building from Jekyll.

## What the cutover commit did

- Deleted Jekyll source directories: `_posts/`, `_layouts/`, `_includes/`, `_sass/`, `_data/`, `pages/`
- Deleted Jekyll config files: `_config.yml`, `Gemfile`, `Gemfile.lock`, `type-on-strap.gemspec`, root `CNAME`, root `index.html`
- Deleted Docker dev environment: `Dockerfile`, `.dockerignore`, `.devcontainer/`
- Replaced `.github/workflows/integration.yml` (Jekyll CI → Astro CI)
- Replaced `.github/workflows/deployment.yml` (Jekyll deploy → Astro deploy via withastro/action@v3)
- Updated `astro/src/components/Footer.astro` (removed "Powered by Jekyll" attribution)
- Rewrote `CONTRIBUTING.md` for Astro workflow
- Updated `README.md` with Astro tech stack info
