# syntax=docker/dockerfile:1

### Description
# This container is used to create the files for the initial svelte project
# setup. The container is used to make the project setup more reproducible.
# In hindsight, this was probably overkill.

### Instructions
# Run this Dockerfile from within it's directory with
# (make sure to delete the folder svelte-skeleton if it already exists)
# docker buildx build --output type=local,dest=svelte-skeleton .
# 
# for debugging, modify the command like this:
# docker buildx build --no-cache --progress=plain --output type=local,dest=svelte-skeleton .

FROM node:22 AS project-skeleton-creation

# Set the container's internal working directory
WORKDIR /skeleton-creation

# Install the skeleton creator package
RUN corepack enable pnpm
RUN corepack use pnpm@9
RUN pnpm add -D sv

# Run the skeleton creation code (creates the skeleton in subfolder "skeleton")
RUN pnpm dlx sv create --template minimal --types ts --no-add-ons --no-install skeleton

WORKDIR /skeleton-creation/skeleton

RUN pnpm dlx sv add --no-install --no-preconditions --tailwindcss typography -- tailwindcss
RUN pnpm dlx sv add --no-install --no-preconditions --tailwindcss forms
RUN pnpm dlx sv add --no-install --no-preconditions --tailwindcss typography
RUN pnpm dlx sv add --no-install --no-preconditions --tailwindcss container-queries
RUN pnpm dlx sv add --no-install --no-preconditions --sveltekit-adapter static --paraglide no-demo -- prettier eslint vitest playwright paraglide storybook
RUN pnpm add -D @xyflow/svelte

# Now we have a home folder (/) with the image's nodejs installation,
# a sub-folder (/skeleton-creation) where the skeleton creator package is installed,
# and a sub-sub-folder (/skeleton-creation/skeleton) where the skeleton is stored

# Create a new blank image
FROM scratch AS project-skeleton-files-only

# copy the skeleton created in the old image into the top-level directory
# of the new image
COPY --from=project-skeleton-creation /skeleton-creation/skeleton /