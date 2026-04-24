# Images Folder — Ταβέρνα Ο Γιάννης

Place your photos in this folder and update the HTML as described below.

## How to Replace Placeholders

Search each HTML file for `<!-- TODO: replace this div with <img ...>` and swap the placeholder `<div>` for a real `<img>` tag.

**Example:**
```html
<!-- Before -->
<div class="img-placeholder img-placeholder-welcome">
  <span class="ph-icon">📷</span>
  <span class="ph-label">Προσθέστε φωτογραφία...</span>
</div>

<!-- After -->
<img src="images/taverna-interior.jpg" alt="Εσωτερικό ταβέρνας" class="img-placeholder-welcome">
```

## Suggested File Names

| File | Where used |
|------|-----------|
| `logo.png` | Navbar on all pages |
| `taverna-interior.jpg` | Home welcome section |
| `pites.jpg` | Home highlight card 1 – Πίτες |
| `meats.jpg` | Home highlight card 2 – Κρεατικά |
| `atmosphere.jpg` | Home highlight card 3 – Ατμόσφαιρα |
| `taverna-story.jpg` | About page – Our Story section |
| `family.jpg` | About page – Family photo section |
| `photo1.jpg` … `photo12.jpg` | Gallery grid (12 slots) |

## Recommended Specs

- **Format:** JPEG for photos, PNG for logo with transparency
- **Max width:** 1600px (the site will scale them down automatically)
- **Compression:** Aim for under 300KB per photo for fast loading on mobile
- **Aspect ratio for gallery:** 4:3 works best with the grid layout

## Logo

Replace the dashed `LOGO` box in the navbar (`class="logo-placeholder"`) with:

```html
<img src="images/logo.png" alt="Ταβέρνα Ο Γιάννης" class="nav-logo" style="height:46px;">
```
