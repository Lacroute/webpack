todo
  h3 {opts.title}
  ul
    li(each="{items}")
      label(class="{completed:done}")
        input(type="checkbox",checked="{done}",onclick="{toggle}")
        {" " + title}

  form(onsubmit="{add}")
    input(name="input",onkeyup="{edit}")
    button(disabled="{!text}") Add {items.length + 1}

  script.
    this.disabled=true
    this.items = opts.items || []
    edit(e) {
      this.text = e.target.value;
    }
    add(e) {
      if(this.text) {
        this.items.push({title: this.text})
        this.text = this.input.value = ''
      }
    }
    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }