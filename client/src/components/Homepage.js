import Header from "./Header";
import React, { useEffect, useState } from "react";

// export default function HomePage() {
//   const [state, setState] = useState({
//     user: {},
//     error: null,
//     authenticated: false,
//   });

//   const handleNotAuthenticated = () => {
//     setState({ authenticated: false });
//   };

//   useEffect(() => {
//     fetch("/auth/login/success", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true,
//       },
//     })
//       .then((response) => {
//         if (response.status === 200) return response.json();
//         throw new Error("failed to authenticate user");
//       })
//       .then((responseJson) => {
//         setState({
//           authenticated: true,
//           user: responseJson.user,
//         });
//       })
//       .catch((error) => {
//         setState({
//           authenticated: false,
//           error: "Failed to authenticate user",
//         });
//       });
//   }, []);

//   const { authenticated } = state;
//   return (
//     <div>
//       <Header
//         authenticated={authenticated}
//         handleNotAuthenticated={handleNotAuthenticated}
//       />
//       <div>
//         {!authenticated ? (
//           <h1>Welcome!</h1>
//         ) : (
//           <div>
//             <h1>You have login succcessfully!</h1>
//             <h2>Welcome {state.user.displayName}!</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
export default function HomePage() {
  return <div>HI BITCH</div>;
}
