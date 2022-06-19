import React from "react";

class DialogModel {

  view: string;
  title: string;
  element: React.ReactNode;
  data: string | number | object;
  handleClose: () => void;
  handleConfirm: () => void;
  handleSetData: () => void;

  constructor() {

    this.view = ''
    this.title = ''
    this.element = ''
    // this.button = ''
    this.data = null

    this.handleClose = () => { }
    this.handleConfirm = () => { }
    this.handleSetData = () => { }
  }

  getView() { return this.view }
  setView(view) { this.view = view }

  getTitle() { return this.title }
  setTitle(title) { this.title = title }

  getElement() { return this.element }
  setElement(element) { this.element = element }

  // getButton() { return this.button }
  // setButton(button) { this.button = button }

  getData() { return this.data }
  setData(data) { this.data = data }

  getHandleClose() { return this.handleClose }
  setHandleClose(handleClose) { this.handleClose = handleClose }

  getHandleConfirm() { return this.handleConfirm }
  setHandleConfirm(handleConfirm) { this.handleConfirm = handleConfirm }

  getHandleSetData() { return this.handleSetData }
  setHandleSetData(handleSetData) { this.handleSetData = handleSetData }
}

export default DialogModel
