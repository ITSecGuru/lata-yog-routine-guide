# GitHub Pages Setup Guide

## What this package is ready for

This project is already prepared for GitHub Pages deployment.
It includes:

- automatic Vite base-path handling for GitHub Pages
- a ready-made GitHub Actions workflow
- a normal local development setup

## Step 1: Create a repository

1. Sign in to GitHub.
2. Click **New repository**.
3. Repository name: `lata-yog-routine-guide`
4. Keep it Public for the easiest free Pages setup.
5. Click **Create repository**.

## Step 2: Upload the project files

1. Download and unzip this project.
2. Open the new repository on GitHub.
3. Click **Add file** > **Upload files**.
4. Upload all project files and folders from this project.
5. Commit the upload to the `main` branch.

## Step 3: Turn on GitHub Pages

1. In the repository, open **Settings**.
2. Open **Pages** in the left menu.
3. Under **Build and deployment**, choose **Source: GitHub Actions**.
4. Save if GitHub asks.

## Step 4: Wait for the first deployment

1. Open the **Actions** tab.
2. You should see a workflow named **Deploy to GitHub Pages**.
3. Wait until it shows a green check mark.

## Step 5: Open your site

Your site URL will usually be:

`https://YOUR-GITHUB-USERNAME.github.io/lata-yog-routine-guide/`

Replace `YOUR-GITHUB-USERNAME` with your GitHub username.

## Notes

- Local development still works with:
  - `npm install`
  - `npm run dev`
- GitHub Pages deployment does not require you to run build commands locally if GitHub Actions is enabled.
- If your repository name is different, the deployment still adjusts automatically.
