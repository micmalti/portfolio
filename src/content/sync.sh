#!/bin/bash

PROJECT_PATH="$HOME/Projects/portfolio/src/content"

rm -r "$PROJECT_PATH/notes/"*

while IFS= read -r id
  do
    if [[ -n $id ]]; then
      joplin export --note "$id" --format "md_frontmatter" "$PROJECT_PATH/notes"
    fi
  done < "$PROJECT_PATH/publish-list.txt"
