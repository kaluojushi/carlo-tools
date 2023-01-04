const buttonCounter = {
  template: `
  <button @click="count++">You clicked me {{ count }} times.</button>
  `,
  data() {
    return {
      count: 0
    };
  },
}

export default buttonCounter;
