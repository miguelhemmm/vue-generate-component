# Vue js component generator [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

CLI util for easy generate Vue js component

## Installation

```js
npm install -g vue-generate-build
```

## Usage

```bash
vgc --help
```

### Create new component (block level)

```bash
vgc footer
```

Will generate four files:

**footer.js**

```javascript
export default {
  name: 'footer',
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
```

**footer.html**

```html
<section class="footer">
  <h1>footer Component</h1>
</section>
```

**footer.scss**

```css
.footer {
}
```

**index.vue**

```html
<template src="./footer.component.html"></template>
<script src="./footer.component.js"></script>
<style src="./footer.component.scss" scoped lang="scss"></style>
```

### Create new build for a brand

```bash
vgc -b vidanta
```

Will generate five files:

**vidanta.js**

```javascript
export default {
  name: 'App',
  components: {

  },
};

```

**vidanta.html**

```html
<section class="vidanta">
  <h1>Vidanta Component</h1>
</section>
```

**vidanta.scss**

```css
@import '../../assets/styles/main.scss';

/*=== Body Color ===*/
$body-color: #4c4c4c;
/*=== Brand Primary Color ===*/
$brand-primary: #002e5d;
/*=== Brand Secondary Color ===*/
$brand-secondary: #61c9ce;
/*=== Brand Primary Tertiary Color ===*/
$brand-tertiary: #b8b8b8;

.footer {
}
```

**index.vue**

```html
<template src="./footer.component.html"></template>
<script src="./footer.component.js"></script>
<style src="./footer.component.scss" scoped lang="scss"></style>
```

**main.js**

```html
import { createApp } from 'vue';
import Index from './index.vue';
import '../../assets/styles/main.scss';

createApp(Index).mount('#app');

```

### Create new component single file

```bash
vgc -s home
```

will generate one vue file:

```javascript
<template lang="html">
  <section class="home">
    <h1>home Component</h1>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'home',
    props: [],
    mounted() {

    },
    data() {
      return {

      };
    },
    methods: {

    },
    computed: {

    }
};
</script>

<style scoped lang="scss">
  .home {

  }
</style>
```

### Create new component single file inside new folder

```bash
vgc -s home --folder
```

### Create new directive

```bash
vgc -d my-directive
```

will generate:

**my-directive.directive.js**

```javascript
import Vue from 'vue';

Vue.directive('my-directive', {
  bind() {},
  // When the bound element is inserted into the DOM...
  inserted(el) {
    // el.focus();
  },
  update() {},
  unbind() {}
});
```

### If you want use postfix in file name, use -- postfix

```bash
vgc footer --postfix page
```

Will generate files with postfix:

- footer.page.js
- footer.page.css
- footer.page.html
- footer.page.spec.js

### Change the default file types for html, style, script, and spec

```bash
sudo vgc --html jade --style less --script ts --spec ts
```

### Contribute

If you want to fix/improve the templates you're welcome to create a PR.
