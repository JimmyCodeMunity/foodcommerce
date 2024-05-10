import React, { Suspense, lazy, useContext } from "react";

import {
  AdminLayout,
  ApproverLayout,
  CookLayout,
  DashboardLayout,
  FinanceLayout,
  ClientLayout,
  DriverLayout,
} from "./layouts/dashboard";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import UploadDriverImg from "./DeliveryAdmin/UploadDriverImg.js";
import { AuthContext } from "./Helper/Context.js";

export const ClientTransactions = lazy(
  () => import("./Clients/ClientTransaction.js")
);
export const Login = lazy(() => import("./ClientApp/Auth/Login"));
export const Onboard1 = lazy(() => import("./ClientApp/Onboarding/Onboard1"));
export const Onboard2 = lazy(() => import("./ClientApp/Onboarding/Onboard2"));
export const Onboard3 = lazy(() => import("./ClientApp/Onboarding/Onboard3"));
export const CreateAcc = lazy(() => import("./ClientApp/Auth/CreateAcc"));
export const Otp = lazy(() => import("./ClientApp/Auth/Otp"));
export const Secure = lazy(() => import("./ClientApp/Auth/secure"));
export const ClientHome = lazy(() => import("./Clients/ClientHome"));
export const ClientBooked = lazy(() => import("./Clients/ClientBooked"));
export const MealDets = lazy(() => import("./Clients/Mealdets"));
export const MealDetsBooked = lazy(() => import("./Clients/MealdetsBooked"));
export const Address = lazy(() => import("./Clients/Address"));
export const ToCart = lazy(() => import("./Clients/ToCart"));
export const Payment = lazy(() => import("./Clients/Payment"));
export const Prompt = lazy(() => import("./Clients/Prompt"));
export const Pending = lazy(() => import("./Clients/Pending"));
export const PaymentSuccess = lazy(() => import("./Clients/PaymentSuccess"));
export const ManualPay = lazy(() => import("./Clients/ManualPay"));
export const MyOrders = lazy(() => import("./Clients/MyOrders"));
export const BookedOrders = lazy(() => import("./Clients/BookedOrders"));
export const OrderDets = lazy(() => import("./Clients/OrderInfo"));
export const Cooks = lazy(() => import("./Clients/Cooks"));
export const ViewCook = lazy(() => import("./Clients/ViewCook"));
export const ActiveShifts = lazy(() => import("./Clients/ActiveShifts"));
export const ClientProfile = lazy(() => import("./Clients/Profile"));
export const EditProfile = lazy(() => import("./Clients/EditProfile"));
export const FavMeals = lazy(() => import("./Clients/FavMeals"));
export const FavCooks = lazy(() => import("./Clients/FavCooks"));
export const AddLoc = lazy(() => import("./Clients/AddLoc"));
export const ManualLoc = lazy(() => import("./Clients/ManualLoc"));
export const Adddriver = lazy(() => import("./DeliveryAdmin/Adddriver.js"));
export const UploadImg = lazy(() => import("./DeliveryAdmin/UploadImg.js"));
export const Viewdriver = lazy(() => import("./DeliveryAdmin/Viewdriver.js"));
export const Editdriver = lazy(() => import("./DeliveryAdmin/EditDriver.js"));
export const EditdriverDets = lazy(
  () => import("./DeliveryAdmin/EditdriverDets.js")
);
export const EditdriverImg = lazy(
  () => import("./DeliveryAdmin/EditdriverImg.js")
);
export const AssignVehicle = lazy(
  () => import("./DeliveryAdmin/AssignVehicle.js")
);
export const Assigneddriver = lazy(
  () => import("./DeliveryAdmin/Assigneddriver.js")
);
export const UnassignedDriver = lazy(
  () => import("./DeliveryAdmin/UnassignedDriver.js")
);
export const AssignedVehicle = lazy(
  () => import("./DeliveryAdmin/AssignedVehicle.js")
);
export const UnassignedVehicle = lazy(
  () => import("./DeliveryAdmin/UnassignedVehicle.js")
);
export const AddVehicle = lazy(() => import("./DeliveryAdmin/Addvehicle.js"));
export const ViewVehicle = lazy(() => import("./DeliveryAdmin/ViewVehicle.js"));
export const EditVehicle = lazy(() => import("./DeliveryAdmin/EditVehicle.js"));
export const AssignDriver = lazy(
  () => import("./DeliveryAdmin/AssignDriver.js")
);
export const MyAccount = lazy(() => import("./DeliveryAdmin/MyAccount.js"));
export const Analytics = lazy(() => import("./DeliveryAdmin/Analytics.js"));
export const MyFinancials = lazy(
  () => import("./DeliveryAdmin/MyFinancials.js")
);
export const RiderNewMssg = lazy(() => import("./DeliveryAdmin/NewMssg"));
export const Commune = lazy(
  () => import("./DeliveryAdmin/Communications")
);
export const RiderMessage = lazy(() => import("./DeliveryAdmin/Message"));
export const ActiveOrders = lazy(() => import("./DriverApp/ActiveOrders"));
export const AssignOrders = lazy(
  () => import("./DeliveryAdmin/AssignOrders.js")
);
export const ThemeProvider = lazy(() => import("../src/theme"));
// export const { UserPage, IndexPage } = lazy(() => import("./routes/sections"));

export const Transactions = lazy(
  () => import("./SystemAdmin/Transactions/Transactions")
);
export const Admins = lazy(() => import("./SystemAdmin/admin/Admins"));
export const Shift = lazy(() => import("./SystemAdmin/Shift"));
export const Markup = lazy(() => import("./SystemAdmin/Markup"));
export const NewMssg = lazy(() => import("./SystemAdmin/NewMssg"));
export const Communications = lazy(
  () => import("./SystemAdmin/Communications")
);
export const Message = lazy(() => import("./SystemAdmin/Message.js"));
export const FinanceHome = lazy(() => import("./FinanceAdmin/FinanceHome"));
export const FinanceDelivary = lazy(
  () => import("./FinanceAdmin/FinanceDelivary")
);
export const FinanceShifts = lazy(() => import("./FinanceAdmin/FinanceShifts"));
export const FinanceTransac = lazy(
  () => import("./FinanceAdmin/FinanceTransac")
);
export const ApproverHome = lazy(() => import("./ApproverAdmin/ApproverHome"));
export const CookProfile = lazy(() => import("./ApproverAdmin/CookProfile"));
export const CookInfo = lazy(() => import("./ApproverAdmin/CookInfo"));
export const CookMeals = lazy(() => import("./ApproverAdmin/CookMeals"));
export const ApproverCooks = lazy(
  () => import("./ApproverAdmin/ApproverCooks")
);
export const ApproverCook = lazy(() => import("./ApproverAdmin/ApproverCook"));
export const ApproverMeals = lazy(
  () => import("./ApproverAdmin/ApproverMeals")
);
export const ApproverMeal = lazy(() => import("./ApproverAdmin/ApproverMeal"));
export const VerifyDelivery = lazy(() => import("./DriverApp/VerifyDelivery"));
export const DriverAdminHome = lazy(
  () => import("./DeliveryAdmin/DriverAdminHome")
);
export const RegisterCook = lazy(() => import("./Cooks/Register"));
export const UploadDocs = lazy(() => import("./Cooks/UploadDocs"));
export const Submitted = lazy(() => import("./Cooks/Submitted"));
export const CookHome = lazy(() => import("./Cooks/CookHome"));
export const ShiftSummary = lazy(() => import("./Cooks/ShiftSummary"));
export const ShiftInfo = lazy(() => import("./Cooks/ShiftInfo"));
export const ShiftPeriod = lazy(() => import("./Cooks/ShiftPeriod"));
export const StartShift = lazy(() => import("./Cooks/StartShift"));
export const EditShift = lazy(() => import("./Cooks/Editshift"));
export const EndShift = lazy(() => import("./Cooks/EndShift"));
export const CookReady = lazy(() => import("./Cooks/CookReady"));
export const CookDispatched = lazy(() => import("./Cooks/CooksDispatched"));
export const CookDelivered = lazy(() => import("./Cooks/CookDelivered"));
export const CookIncoming = lazy(() => import("./Cooks/CookIncoming"));
export const AcceptedView = lazy(() => import("./Cooks/AcceptedView"));
export const CookAccepted = lazy(() => import("./Cooks/CookAccepted"));
export const CookCreateMeals = lazy(() => import("./Cooks/CookCreateMeals"));
export const CookAddMeal = lazy(() => import("./Cooks/CookAddMeal"));
export const Uploadcookdocs = lazy(() => import("./Cooks/Uploadcookdocs"));
export const Viewcookmeal = lazy(() => import("./Cooks/Viewcookmeal"));
export const CookPackage = lazy(() => import("./Cooks/Cookpackages"));
export const ViewMeal = lazy(() => import("./Cooks/Viewmeal"));
export const EditMeal = lazy(() => import("./Cooks/Editmeal"));
export const MealImages = lazy(() => import("./Cooks/MealImages"));
export const CreatePackage = lazy(() => import("./Cooks/CreatePackage"));
export const EditPackage = lazy(() => import("./Cooks/EditPackage"));
export const EditPackageDets = lazy(() => import("./Cooks/EditPackageDets"));
export const CookReviews = lazy(() => import("./Cooks/CookReviews"));
export const CookAnalytics = lazy(() => import("./Cooks/CookAnalytics"));
export const CookProfileInfo = lazy(() => import("./Cooks/CookProfileInfo"));
export const EditCookProfile = lazy(() => import("./Cooks/EditCookProfile"));
export const TransactionHistory = lazy(
  () => import("./Cooks/TransactionHistory")
);
export const ViewTransacorder = lazy(() => import("./Cooks/ViewTransacorder"));
export const ChangeNumber = lazy(() => import("./Cooks/ChangeNumber"));
export const NewNumber = lazy(() => import("./Cooks/NewNumber"));
export const Verifyno = lazy(() => import("./Cooks/Verifyno"));
export const ShiftPackage = lazy(() => import("./Cooks/ShiftPackage"));
export const MealInfo = lazy(() => import("./Cooks/MealInfo"));
export const IncomingOrders = lazy(() => import("./Cooks/IncomingOrders"));
export const Prepared = lazy(() => import("./Clients/Prepared"));
export const PendingAcceptance = lazy(
  () => import("./Clients/Pendingacceptance")
);
export const DriverCoOtp = lazy(() => import("./ClientApp/Auth/DriverCoOtp"));
export const DriverCoSecure = lazy(
  () => import("./ClientApp/Auth/DriverSecure")
);
export const DriverAdminLogin = lazy(
  () => import("./ClientApp/Auth/DriverAdminLogin")
);
export const AdminCreateAcc = lazy(
  () => import("./ClientApp/Auth/AdminCreateAcc")
);
export const AdminLogin = lazy(() => import("./ClientApp/Auth/AdminLogin"));
export const Confirmed = lazy(() => import("./Clients/Confirmed"));
export const Completed = lazy(() => import("./Clients/Completed"));
export const RateDriver = lazy(() => import("./Clients/DriverRating"));
export const RatePackage = lazy(() => import("./Clients/PackageRating"));
export const CookRating = lazy(() => import("./Clients/CookRating"));
export const Thanks = lazy(() => import("./Clients/Thanks"));
export const Rejected = lazy(() => import("./Clients/Rejected"));
export const DriverOtp = lazy(() => import("./ClientApp/Auth/DriverOtp.js"));
export const RiderSecure = lazy(() => import("./ClientApp/Auth/RiderSecure"));
export const DriverLogin = lazy(() => import("./ClientApp/Auth/RiderLogin"));
export const DriverHome = lazy(() => import("./DriverApp/Home"));
export const AuthOrder = lazy(() => import("./DriverApp/AuthOrder"));
export const Arrived = lazy(() => import("./DriverApp/Arrived"));
export const ConfirmOrder = lazy(() => import("./DriverApp/OrderConfirm"));
export const ArrivedClient = lazy(() => import("./DriverApp/ArrivedClient"));
export const ClientDelivery = lazy(() => import("./DriverApp/ClientDelivery"));
export const ClientConfirm = lazy(() => import("./DriverApp/ClientConfirm"));
export const RateCook = lazy(() => import("./DriverApp/RateCook"));
export const RateClient = lazy(() => import("./DriverApp/RateClient"));
export const DriverThanks = lazy(() => import("./DriverApp/Thanks.js"));
export const Closedorders = lazy(() => import("./DriverApp/Closedorders"));
export const ViewOrder = lazy(() => import("./DriverApp/ViewOrder"));
export const DriverProfile = lazy(() => import("./DriverApp/DriverProfile"));
export const DriverAnalytics = lazy(
  () => import("./DriverApp/DriverAnalytics")
);
export const Mailbox = lazy(() => import("./DriverApp/Mailbox"));

export const Page404 = lazy(() => import("./pages/page-not-found"));

export default function Router() {
  const { isLoggedIn } = useContext(AuthContext);

  const routes = useRoutes([
    {
      element: (
        <Suspense
          fallback={
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          }
        >
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: "/client",
          children: [
            {
              path: "home/:Id",
              name: "Client Home",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ClientHome />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "booked/:Id",
              name: "Client Booked",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ClientBooked />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "mealdets/:Id",
              name: "Meal Details",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <MealDets />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "mealdetsbooked/:Id",
              name: "Meal Details",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <MealDetsBooked />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "address/:Id",
              name: "Address",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Address />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "tocart/:Id",
              name: "To Cart",
              element: (
                <ClientLayout>
                  <ToCart />
                </ClientLayout>
              ),
            },
            {
              path: "payment/:Id",
              name: "Payment",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Payment />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "pending/:Id",
              name: "Pending",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Pending />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "prompt/:Id",
              name: "Prompt",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Prompt />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "manual/:Id",
              name: "Manual Payment",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ManualPay />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "paymentsuccess/:Id",
              name: "Payment Success",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <PaymentSuccess />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "transactions/:Id",
              name: "Payment Success",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ClientTransactions />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "myorders/:Id",
              name: "My Orders",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <MyOrders />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "bookedorders/:Id",
              name: "Booked Orders",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <BookedOrders />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "prepared/:Id",
              name: "Prepared",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Prepared />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "completed/:Id",
              name: "Completed",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Completed />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "confirmed/:Id",
              name: "Confirmed",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Confirmed />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "pendingacceptance/:Id",
              name: "Pending Acceptance",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <PendingAcceptance />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "OnTheWay/:Id",
              name: "Order Details",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <OrderDets />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "rejected/:Id",
              name: "Rejected",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Rejected />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "cooks/:Id",
              name: "Cooks",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <Cooks />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "viewcook/:Id",
              name: "View Cook",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ViewCook />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "activeshifts",
              name: "Active Shifts",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ActiveShifts />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "clientprofile/:Id",
              name: "Client Profile",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ClientProfile />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "editprofile/:Id",
              name: "Edit Profile",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <EditProfile />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "favmeals/:Id",
              name: "Favorite Meals",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <FavMeals />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "favcooks",
              name: "Favorite Cooks",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <FavCooks />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "manualloc/:Id",
              name: "Manual Location",
              element:
                isLoggedIn === true ? (
                  <ClientLayout>
                    <ManualLoc />
                  </ClientLayout>
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "addloc/:Id",
              name: "Add Location",
              element:
                isLoggedIn === true ? <AddLoc /> : <Navigate to={"/login"} />,
            },
            {
              path: "reviewdriver/:Id",
              name: "Rate Driver",
              element:
                isLoggedIn === true ? (
                  <RateDriver />
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "reviewpackaging/:Id",
              name: "Rate Packaging",
              element:
                isLoggedIn === true ? (
                  <RatePackage />
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "reviewcook/:Id",
              name: "Cook Rating",
              element:
                isLoggedIn === true ? (
                  <CookRating />
                ) : (
                  <Navigate to={"/login"} />
                ),
            },
            {
              path: "thanks/:Id",
              name: "Thanks",
              element:
                isLoggedIn === true ? <Thanks /> : <Navigate to={"/login"} />,
            },
          ],
        },

        {
          path: "/driver/home/:Id",
          name: "Driver Home",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <DriverHome />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/arrived/:Id",
          name: "Arrived",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <Arrived />{" "}
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/confirm/:Id",
          name: "Confirm",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <AuthOrder />{" "}
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/success",
          name: "Success",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <ConfirmOrder />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/thanks/:Id",
          name: "Thanks",
          element:
            isLoggedIn === true ? (
              <DriverThanks />
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/clientdelivery/:Id",
          name: "Client Delivery",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <ClientDelivery />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/dropoff/:Id",
          name: "Dropoff",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <ArrivedClient />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/clientsuccess/",
          name: "Client Success",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <ClientConfirm />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/ratecook/:Id",
          name: "Rate Cook",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <RateCook />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/rateclient/:Id",
          name: "Rate Client",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <RateClient />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/closedorders/:Id",
          name: "Closed Orders",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <Closedorders />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/activeorders/:Id",
          name: "Active Orders",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <ActiveOrders />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/vieworder/:Id",
          name: "View Order",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <ViewOrder />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/profile/:Id",
          name: "Driver Profile",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <DriverProfile />,
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/analytics/:Id",
          name: "Driver Analytics",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <DriverAnalytics />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/mailbox/:Id",
          name: "Mailbox",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <Mailbox />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },
        {
          path: "/driver/clientverify/:Id",
          name: "Client Verify",
          element:
            isLoggedIn === true ? (
              <DriverLayout>
                <VerifyDelivery />
              </DriverLayout>
            ) : (
              <Navigate to={"/driver/login"} />
            ),
        },

        {
          path: "/driveradmin/assigneddriver/:Id",
          name: "Assigned Driver",
          element:
            isLoggedIn === true ? (
              <Assigneddriver />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/commune/:Id",
          name: "Driver admin Communication",
          element:
            isLoggedIn === true ? (
              <Commune/>
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/ridernewmssg",
          name: "New Message",
          element:
            isLoggedIn === true ? (
              <RiderNewMssg />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/ridermessage/:Id",
          name: "Comunication",
          element:
            isLoggedIn === true ? (
              <RiderMessage />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/driverhome/:Id",
          name: "Driver Admin Home",
          element:
            isLoggedIn === true ? (
              <DriverAdminHome />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/assignorder/:Id",
          name: "Assign Order",
          element:
            isLoggedIn === true ? (
              <AssignOrders />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/driveredit/:Id",
          name: "Edit Driver",
          element:
            isLoggedIn === true ? (
              <Adddriver />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/uploadimg/:Id",
          name: "Upload Image",
          element:
            isLoggedIn === true ? (
              <UploadImg />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/viewdriver/:Id",
          name: "View Driver",
          element:
            isLoggedIn === true ? (
              <Viewdriver />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/editdriver/:Id",
          name: "Edit Driver",
          element:
            isLoggedIn === true ? (
              <Editdriver />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/editdriverdets/:Id",
          name: "Edit Driver Details",
          element:
            isLoggedIn === true ? (
              <EditdriverDets />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/editdriverimg/:Id",
          name: "Edit Driver Image",
          element:
            isLoggedIn === true ? (
              <EditdriverImg />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/assignvehicle/:Id",
          name: "Assign Vehicle",
          element:
            isLoggedIn === true ? (
              <AssignVehicle />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/unassigneddriver/:Id",
          name: "Unassigned Driver",
          element:
            isLoggedIn === true ? (
              <UnassignedDriver />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/assignedvehicle/:Id",
          name: "Assigned Vehicle",
          element:
            isLoggedIn === true ? (
              <AssignedVehicle />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/unassignedvehicle/:Id",
          name: "Unle",
          element:
            isLoggedIn === true ? (
              <UnassignedVehicle />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/addvehicle/:Id",
          name: "Add Vehicle",
          element:
            isLoggedIn === true ? (
              <AddVehicle />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/viewvehicle/:Id",
          name: "View Vehicle",
          element:
            isLoggedIn === true ? (
              <ViewVehicle />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/uploaddriverimg/:Id",
          name: "upload driver img",
          element:
            isLoggedIn === true ? (
              <UploadDriverImg />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/editvehicle/:Id",
          name: "Edit Vehicle",
          element:
            isLoggedIn === true ? (
              <EditVehicle />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/assigndriver/:Id",
          name: "Assign Vehicle",
          element:
            isLoggedIn === true ? (
              <AssignDriver />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/myaccount/:Id",
          name: "My Account",
          element:
            isLoggedIn === true ? (
              <MyAccount />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/myanalytics/:Id",
          name: "My Analytics",
          element:
            isLoggedIn === true ? (
              <Analytics />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        {
          path: "/driveradmin/myfinancials/:Id",
          name: "My Financials",
          element:
            isLoggedIn === true ? (
              <MyFinancials />
            ) : (
              <Navigate to={"/driveradmin/login"} />
            ),
        },
        // {
        //   path: "/test",
        //   element: (
        //     <DashboardLayout>
        //       <IndexPage />
        //     </DashboardLayout>
        //   ),
        // },
        {
          path: "/dashboard/:Id",
          name: "Dashboard",
          element:
            isLoggedIn === true ? (
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/shifts/:Id",
          name: "Shifts",
          element:
            isLoggedIn === true ? (
              <DashboardLayout>
                <Shift />
              </DashboardLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/markup/:Id",
          name: "Markup",
          element:
            isLoggedIn === true ? (
              <DashboardLayout>
                <Markup />
              </DashboardLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/communications/:Id",
          name: "Comunication",
          element:
            isLoggedIn === true ? (
              <DashboardLayout>
                <Communications />
              </DashboardLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/newmssg",
          name: "New Message",
          element:
            isLoggedIn === true ? (
              <DashboardLayout>
                <NewMssg />
              </DashboardLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/message/:Id",
          name: "Comunication",
          element:
            isLoggedIn === true ? (
              <DashboardLayout>
                <Message />
              </DashboardLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        // {
        //   path: "/user",
        //   name: "User",
        //   element: (
        //     <DashboardLayout>
        //       <UserPage />
        //     </DashboardLayout>
        //   ),
        // },
        {
          path: "/finance",
          name: "Finance",
          element:
            isLoggedIn === true ? (
              <FinanceLayout>
                <FinanceHome />
              </FinanceLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/fdelivaries",
          name: "Finance Delivaries",
          element:
            isLoggedIn === true ? (
              <FinanceLayout>
                <FinanceDelivary />
              </FinanceLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/fshifts",
          name: "Finance Shifts",
          element:
            isLoggedIn === true ? (
              <FinanceLayout>
                <FinanceShifts />
              </FinanceLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/ftransactions",
          name: "Finance Transactions",
          element:
            isLoggedIn === true ? (
              <FinanceLayout>
                <FinanceTransac />
              </FinanceLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/approver/:Id",
          name: "Approver",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <ApproverHome />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/cprofile/:Id",
          name: "Cook Profile",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <CookProfile />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/cookinfo",
          name: "Cook Info",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <CookInfo />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/cookmeals",
          name: "Cook Meals",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <CookMeals />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/acooks",
          name: "Approver Cooks",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <ApproverCooks />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },

        {
          path: "/acooks/:Id",
          name: "Approver Cook Individual",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <ApproverCook />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/ameals/:Id",
          name: "Approver Meals Individual",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <ApproverMeal />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/ameals",
          name: "Approver Meals",
          element:
            isLoggedIn === true ? (
              <ApproverLayout>
                <ApproverMeals />
              </ApproverLayout>
            ) : (
              <Navigate to={"/authlogin"} />
            ),
        },
        {
          path: "/cook/register/:Id",
          name: "Register Cook",
          element:
            isLoggedIn === true ? <RegisterCook /> : <Navigate to={"/login"} />,
        },
        {
          path: "/cook/uploaddocs/:Id",
          name: "Upload Documents",
          element:
            isLoggedIn === true ? <UploadDocs /> : <Navigate to={"/login"} />,
        },
        {
          path: "/cook/submitted/:Id",
          name: "Submitted",
          element:
            isLoggedIn === true ? <Submitted /> : <Navigate to={"/login"} />,
        },
        {
          path: "/cook/home/:Id",
          name: "Cook Home",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookHome />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/mealinfo/:Id",
          name: "Meal Info",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <MealInfo />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/shiftsummary/:Id",
          name: "Shift Summary",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ShiftSummary />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/shiftinfo/:Id",
          name: "Shift Info",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ShiftInfo />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/shiftperiod/:Id",
          name: "Shift Period",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ShiftPeriod />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/startshift/:Id",
          name: "Start Shift",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <StartShift />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/editshift/:Id",
          name: "Edit Shift",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <EditShift />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/endshift/:Id",
          name: "End Shift",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <EndShift />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/incoming/:Id",
          name: "Incoming Orders",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <IncomingOrders />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookready/:Id",
          name: "Cook Ready",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookReady />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookdispatched/:Id",
          name: "Cook Dispatched",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookDispatched />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookdelivered/:Id",
          name: "Cook Delivered",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookDelivered />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookincoming/:Id",
          name: "Cook Incoming",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookIncoming />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookaccepted/:Id",
          name: "Cook Accepted",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookAccepted />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookcreatemeals/:Id",
          name: "Cook Create Meals",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookCreateMeals />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookaddmeal/:Id",
          name: "Cook Add Meal",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookAddMeal />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/uploadcookdocs/:Id",
          name: "Upload Cook Documents",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <Uploadcookdocs />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/viewcookmeal",
          name: "View Cook Meal",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <Viewcookmeal />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookpackage/:Id",
          name: "Cook Package",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookPackage />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: `/cook/viewmeal/:Id`,
          name: "View Meal",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ViewMeal />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/editmeal/:Id",
          name: "Edit Meal",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <EditMeal />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/mealimages/:Id",
          name: "Meal Images",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <MealImages />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/createpackage/:Id",
          name: "Create Package",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CreatePackage />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/acceptedview/:Id",
          name: "Create Package",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <AcceptedView />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/shiftpackage/:Id",
          name: "Shift Package",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ShiftPackage />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/editpackage/:Id",
          name: "Edit Package",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <EditPackage />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/editpackagedets/:Id",
          name: "Edit Package Dets",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <EditPackageDets />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/reviews/:Id",
          name: "Cook Reviews",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookReviews />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/cookanalytics/:Id",
          name: "Cook Analytics",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookAnalytics />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/profileinfo/:Id",
          name: "Cook Profile Info",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <CookProfileInfo />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/editcookprofile/:Id",
          name: "Edit Cook Profile",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <EditCookProfile />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/transactionhistory/:Id",
          name: "Transaction History",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <TransactionHistory />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/viewtransacorder/:Id",
          name: "View Transac Order",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ViewTransacorder />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/changenumber/:Id",
          name: "Change Number",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <ChangeNumber />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/newnumber/:Id",
          name: "New Number",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <NewNumber />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/cook/verifyno/:Id",
          name: "Verify Number",
          element:
            isLoggedIn === true ? (
              <CookLayout>
                <Verifyno />
              </CookLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/admins/:Id",
          element:
            isLoggedIn === true ? (
              <AdminLayout>
                <Admins />
              </AdminLayout>
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "404",
          element: <Page404 />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
    {
      path: "/",
      name: "Client Home",
      element: <Onboard1 />,
    },
    {
      path: "/Onboard2",
      name: "Client Home",
      element: <Onboard2 />,
    },
    {
      path: "/Onboard3",
      name: "Client Home",
      element: <Onboard3 />,
    },
    {
      path: "/signup",
      name: "Client Home",
      element: <CreateAcc />,
    },
    {
      path: "/otp",
      name: "Client Home",
      element: <Otp />,
    },
    {
      path: "/secure",
      name: "Client Home",
      element: <Secure />,
    },
    {
      path: "/login",
      name: "Client Home",
      element: <Login />,
    },
    {
      path: "/authsignup",
      name: "Dashboard Signin",
      element: <AdminCreateAcc />,
    },
    {
      path: "/authlogin",
      name: "Dashboard Login",
      element: <AdminLogin />,
    },
    {
      path: "/driver/otp",
      name: "Driver OTP Validate",
      element: <DriverOtp />,
    },
    {
      path: "/driver/secure",
      name: "Driver Secure Account",
      element: <RiderSecure />,
    },
    {
      path: "/driver/login",
      name: "Driver login",
      element: <DriverLogin />,
    },
    {
      path: "/driveradmin/otp",
      name: "Driver Admin OTP Validate",
      element: <DriverCoOtp />,
    },
    {
      path: "/driveradmin/secure",
      name: "Driver Admin secure",
      element: <DriverCoSecure />,
    },
    {
      path: "/driveradmin/login",
      name: "Driver Admin Login",
      element: <DriverAdminLogin />,
    },
  ]);
  return routes;
}
