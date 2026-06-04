import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainNav from "./MainNav";
import MainHome from "./MainHome";
import About from "./About";
import Contact from "./Contact";
import MesswalaRegister from "./MesswalaRegistr";
import MesswalaLogin from "./MesswalaLogin";
import TeffenwalRegister from "./TeffinwalaRegister";
import TeffenLogin from "./TeefinLogin";

import TeffinNav from "./TeffinNav";
import TeffenHome from "./TeffinHome";
import UserMess from "./UserMess";
import MessView from "./MessView";
import JoinMess from "./JoinMess";
import Similardata from "./Similardata";
import Owner from "./Owner";
import Tiffenwalaprofile from "./TiffenwalaProfile";

import MessNav from "./MessNav";
import MessHome from "./MessHome";
import TeffinwalaList from "./Teffenwalalist";
import AddInstanceFood from "./AddInstantFood";

import Webcamtiffin from "./Webcamtiffen";
import MessDetail from "./MessDetail";
import StartedMess from "./StartedMess";
import DefineMenu from "./DefineMenu";
import TeffinContact from "./TeffinContact";
import CustomessageMess from "./CusstomMesageMess";

function App() {

  // ✅ Convert to proper boolean
  const hasTeffin = !!localStorage.getItem("teffintoken");
  const hasMess = !!localStorage.getItem("token");

  // ✅ Role decide (VERY IMPORTANT)
  let role = "public";

  if (hasTeffin && !hasMess) {
    role = "teffin";
  } else if (hasMess && !hasTeffin) {
    role = "mess";
  }

  return (
    <BrowserRouter>

      {/* ✅ Navbar (ONLY ONE WILL RENDER) */}
      {role === "teffin" && <TeffinNav />}
      {role === "mess" && <MessNav />}
      {role === "public" && <MainNav />}

      {/* ✅ Routes */}
      <Routes>

        {/* 🔹 Teffin Routes */}
        {role === "teffin" && (
          <>
            <Route path="/teffinhome" element={<TeffenHome />} />
            <Route path="/usermess" element={<UserMess />} />
            <Route path="/messview/:id" element={<MessView />} />
            <Route path="/joinmess" element={<JoinMess />} />
            <Route path="/similar" element={<Similardata />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/tiffinprofile" element={<Tiffenwalaprofile />} />
            <Route path="*" element={<TeffenHome />} />

            <Route path="/messdetail" element={<MessDetail/>}/>
          </>
        )}

        {/* 🔹 Mess Routes */}
        {role === "mess" && (
          <>
            <Route path="/messhome" element={<MessHome />} />
            <Route path="/viewteffinwala" element={<TeffinwalaList />} />
            <Route path="/addinstace" element={<AddInstanceFood />} />
            <Route path="/startedmess" element={<StartedMess/>}/>
            <Route path="/messmenu" element={<DefineMenu/>}/>
            <Route path="/teffincontact/:id" element={<TeffinContact />} />
            <Route path="/custommessagemess" element={<CustomessageMess/>}/>
            <Route path="*" element={<MessHome />} />

          </>
        )}

        {/* 🔹 Public Routes */}
        {role === "public" && (
          <>
            <Route path="/" element={<MainHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/messregister" element={<MesswalaRegister />} />
            <Route path="/messlogin" element={<MesswalaLogin />} />
            <Route path="/teffinregister" element={<TeffenwalRegister />} />
            <Route path="/teffinlogin" element={<TeffenLogin />} />
            <Route path="/webcam" element={<Webcamtiffin />} />
            <Route path="*" element={<MainHome />} />
          </>
        )}

      </Routes>

    </BrowserRouter>
  );
}

export default App;