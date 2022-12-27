class QuickView extends HTMLElement {
  constructor() {
    super()
    this.bindEvents();
  }
  /**
  *  bind Events
  */
  bindEvents() {
    this.openeBy = document.querySelectorAll('.quickview--button');
    this.openeBy.forEach(btn => btn.addEventListener('click',this.openQuickShop.bind(this)));
  }
  /**
  *  Open Modal
  */
  openQuickShop(event) {
    event.preventDefault();
    let currentTarget = event.currentTarget;
    var dataHandle = currentTarget.dataset.handle;
    this.loadQuickShop(dataHandle);
    this.closeQuickView(dataHandle);
  }
  /**
  *  Fetch Product data using Product handle
  */
  loadQuickShop(dataHandle) {
    fetch(`/products/${dataHandle}?view=quickview&sections=template-product-quickview`)
    .then(response => response.json())
    .then((result) => {
      document.querySelector('quick-view').setAttribute("quick-viewhandle",dataHandle);
      document.querySelector('quick-view').innerHTML = result[`template-product-quickview`];
      var quickViewData = document.querySelectorAll('quick-view').innerHTML = result[`template-product-quickview`];
      document.querySelector('quick-view').setAttribute("id","main");
      this.closeQuickView(quickViewData);
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
  closeQuickView() {
    document.querySelectorAll('.close-quickview').forEach(item => {
      item.addEventListener('click', event => {
        document.querySelector('.quick-modal').style.display = "none";
      })
    })
  }
}
customElements.define("quick-view", QuickView)