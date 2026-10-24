# Wortkarten: from web app to Android app

This folder is a complete installable web app (PWA). It works offline, has its own icon, and can be turned into an Android app for Google Play with PWABuilder.

## What's in the folder

| File | What it does |
|---|---|
| `index.html` | The app itself |
| `manifest.webmanifest` | App name, colours and icons for Android |
| `sw.js` | Makes the app open without internet |
| `privacy.html` | Privacy policy (required by Google Play) |
| `icons/` | App icons in every size Android needs |
| `.nojekyll` | Tells GitHub Pages to publish every file, including `.well-known` later |

Live at https://mahmoudabdelrahmande-spec.github.io/ . Google Play requires a contact email in the store listing; you can also add one to `privacy.html`.

---

## Step 1: Put the app online with GitHub Pages (free, about 15 minutes)

1. Create a free account at **github.com**. Remember your username, for example `mahmoud-daf`.
2. Click **+** (top right) → **New repository**.
3. Name the repository **exactly** `YOURUSERNAME.github.io` (for example `mahmoud-daf.github.io`). Choose **Public**, then **Create repository**.
   Using this exact name puts the app at the root of your address, which Step 3 needs.
4. On the new repository page, click **uploading an existing file**.
5. Unzip the package on your computer, open the `wortkarten-app` folder, select **everything inside it** (not the folder itself) and drag it into the browser. Click **Commit changes**.
   If `.nojekyll` is hidden on your computer, create it on GitHub instead: **Add file → Create new file**, name it `.nojekyll`, leave it empty, commit.
6. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
7. After 1–2 minutes your app is live at `https://YOURUSERNAME.github.io/`.

**Test it:** open that address in Chrome on an Android phone. Chrome should offer **Install app** (or use ⋮ → *Install app*). Turn on airplane mode and open it again: it should still work.

You can already share this link with students. They install it from Chrome, no Play Store needed.

---

## Step 2: Create the Android package with PWABuilder (free, about 10 minutes)

1. Go to **pwabuilder.com**, paste `https://YOURUSERNAME.github.io/` and click **Start**.
2. It checks the manifest, offline support and icons. All three should pass.
3. Click **Package for stores → Android → Generate Package**.
4. In the options:
   - **Package ID**: something unique and permanent, for example `io.github.yourusername.wortkarten`. You can never change it later.
   - **App name**: Wortkarten
   - **Signing key**: leave *Create new*.
5. Download the zip. Inside you will find:
   - an `.apk` file: install this directly on a phone to test, or send it to students
   - an `.aab` file: this is what you upload to Google Play
   - a `signing.keystore` file and a text file with its passwords
   - `assetlinks.json`

> **Keep the signing key and its passwords safe** (for example in Google Drive and on a USB stick). Every future update on Google Play must be signed with the same key. If you lose it, you can't update the app.

---

## Step 3: Remove the browser address bar inside the Android app

Without this step the Android app shows a small address bar at the top.

1. In your GitHub repository, click **Add file → Upload files**.
2. Upload `assetlinks.json` into a folder called `.well-known`. The easiest way: **Add file → Create new file**, type the name `.well-known/assetlinks.json`, paste the contents of the file, commit.
3. Check that `https://YOURUSERNAME.github.io/.well-known/assetlinks.json` opens in the browser.
4. Reinstall the app on your phone. The address bar is gone.

---

## Step 4: Publish on Google Play (optional)

1. Create a developer account at **play.google.com/console** (one-time fee of 25 US dollars, identity check required).
2. **Create app** → name *Wortkarten*, category *Education*, free.
3. Fill in the store listing: short description, full description, the 512×512 icon from `icons/icon-512.png`, at least two phone screenshots, and the privacy policy link `https://YOURUSERNAME.github.io/privacy.html`.
4. New personal accounts must run a **closed test with at least 12 testers for 14 days** before going public. Add your students' Gmail addresses as testers, upload the `.aab` file to the closed testing track, and ask them to install it and use it.
5. After the 14 days, apply for production access and publish.

---

## Updating the app later

1. Change `index.html` (for example, add new word lists to the `BUILTIN` section).
2. Open `sw.js` and raise the version: `wortkarten-v1` → `wortkarten-v2`.
3. Upload both files to GitHub again.

Students get the update automatically the next time they open the app online. You don't need to upload a new version to Google Play for content changes.
