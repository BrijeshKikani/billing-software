export const actions = {
    setInvoiceData(state, payload) {
        state.invoiceData=payload;
      },
      setUserId(state, payload) {
        state.userId=payload;
      },
      setIsAuthenticated(state, payload) {
        state.isAuthenticated = true
      }
}