export const mutations = {
    setInvoiceData(state, payload) {
        state.invoiceData=payload;
      },
      setUserId(state, payload) {
        state.userId=payload;
      },
      setIsAuthenticated(state, payload) {
        state.isAuthenticated = payload
      }
}