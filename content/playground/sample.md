# Markdown Magic

Markdown is a lightweight markup language that is easy to read and write. In this article, we'll explore some of the key features of Markdown.

## Basics

Markdown basics include headers, emphasis, and lists. Let's start with a simple list:

- Item 1
- Item 2
    - Subitem 2.1
    - Subitem 2.2
- Item 3

This is a numbered list:

1. First item
2. Second item
3. Third item
    1. Subitem 3.1
    2. Subitem 3.2

Remember to include a blank line between the list and other content.

### Emphasis

You can emphasize text using bold or italics:

**This is bold text**

*This is italic text*

~~This is strikethrough text~~

This is a **combination of bold and _italic_** text

This line has `function an() {}`{lang="js"} embedded in it for better clarity.

#### Headers

Headers are useful for organizing content:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Code Blocks

Now, let's look at some code examples:

```javascript [sample.js]{1,3-5}
import {createElement} from "react";

import CodeBlock from "@/components/playground/docs/code-block/CodeBlock";

import type {MDXComponents} from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children, ...props }) => <h1 {...props} className={"mb-2.5 mt-8 text-4xl font-bold"}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 {...props} className={"mb-1 mt-7 text-3xl font-semibold"}>{children}</h2>,
        h3: ({ children, ...props }) => <h3 {...props} className={"mb-1 mt-6 text-2xl font-semibold"}>{children}</h3>,
        h4: ({ children, ...props }) => <h4 {...props} className={"mb-1 mt-5 text-xl font-semibold"}>{children}</h4>,
        h5: ({ children, ...props }) => <h5 {...props} className={"mb-1 mt-4 text-lg font-semibold"}>{children}</h5>,
        h6: ({ children, ...props }) => <h6 {...props} className={"mb-1 mt-3 text-base font-semibold"}>{children}</h6>,

        ul: ({ children, ...props }) => <ul {...props} className={"list-inside list-disc py-1.5 pl-2 marker:text-light-200/50 [&_ul]:py-0 [&_ul]:pl-6"}>{children}</ul>,
        ol: ({ children, ...props }) => <ol {...props} className={"list-inside list-decimal py-1.5 pl-2 marker:text-light-200/50 [&_ol]:py-0 [&_ol]:pl-6"}>{children}</ol>,
        li: ({ children, ...props }) => <li {...props} className={"my-0.5 text-base font-medium dark:text-gray-300"}>{children}</li>,

        em: ({ children, ...props }) => <em {...props} className={"italic"}>{children}</em>,

        p: ({ children, ...props }) => <p {...props} className={"py-1.5 text-base font-medium dark:text-gray-300"}>{children}</p>,
        figure: ({ children, ...props }) => {
            const elementToCreate = Object.hasOwn(props, "data-rehype-pretty-code-figure") ? CodeBlock : "figure";
            return createElement(elementToCreate, props, children);
        },
        ...components,
    };
}
```

## Advanced Formatting

### Tables

Markdown allows you to create tables for better organization:

| Name  | Age | Occupation        |
|-------|-----|-------------------|
| Alice | 25  | Software Engineer |
| Bob   | 30  | Data Scientist    |

This is a vast table:

| Name  | Age | Occupation        | Description                                                                                                          |
|-------|-----|-------------------|----------------------------------------------------------------------------------------------------------------------|
| Alice | 25  | Software Engineer | She is a software engineer with 5 years of experience. She is passionate about coding and building new applications. |
| Bob   | 30  | Data Scientist    | He is a data scientist with 7 years of experience. He loves working with data and building machine learning models.  |

### Horizontal Rules

You can use horizontal rules to separate content:

---

This is now separated content from the previous section.

### Links and Images

You can embed links and images easily:

[Visit GitHub](https://github.com)

![Markdown Logo](https://markdown-here.com/img/icon256.png)

This is an image with a caption:

![Markdown Logo](https://markdown-here.com/img/icon256.png "Markdown Logo")

This is an image with a link:

[![Markdown Logo](https://markdown-here.com/img/icon256.png)](https://markdown-here.com/img/icon256.png)

This is an image with a link and a caption:

[![Markdown Logo](https://markdown-here.com/img/icon256.png "Markdown Logo")](https://markdown-here.com/img/icon256.png)

This is an inline image: ![Markdown Logo](https://markdown-here.com/img/icon256.png)

This is an inline link: [Visit GitHub](https://github.com)

### Blockquotes

> Markdown blockquotes provide a way to emphasize content or cite sources.

## Task Lists

Markdown supports task lists, which are useful for tracking progress:

- [x] Learn Markdown basics
- [ ] Explore advanced Markdown features
- [ ] Build a Markdown document

## Conclusion

Markdown is a versatile language suitable for various purposes. Whether you're writing documentation, creating README files, or blogging, Markdown makes it easy to format your content.

Remember, this is just the tip of the iceberg. Markdown offers even more features and flexibility. Dive in and explore the magic of Markdown!
