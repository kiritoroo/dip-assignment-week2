import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IndexPage from "@page/IndexPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<IndexPage/>} />
          </Routes>
        </Router>
        <ToastContainer 
          style={{ fontSize: 15 }} 
          position="bottom-left"
          theme="light"
        />
      </QueryClientProvider>
    </>
  )
}

export default App
