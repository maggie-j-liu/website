// @ts-ignore
import reactive from "@maggieliu/reactive";
import * as React from "react";
import tailwindConfig from "../tailwind.config";

const generateArray = (obj: { [key: string]: string }) => {
  const keys = Object.keys(obj).sort((a, b) => Number(a) - Number(b));
  return keys.map((key) => obj[key]);
};

const Reactive = ({
  reactionText,
  slug,
}: {
  reactionText: string;
  slug: string;
}) => {
  React.useEffect(() => {
    reactive.install({
      firebaseConfig: {
        apiKey: "AIzaSyDLHhsBoICfmOHaX4gdPuO9l9HGXmHV6Go",
        authDomain: "maggieliu-dev.firebaseapp.com",
        databaseURL: "https://maggieliu-dev-default-rtdb.firebaseio.com",
        projectId: "maggieliu-dev",
        storageBucket: "maggieliu-dev.appspot.com",
        messagingSenderId: "1058065480407",
        appId: "1:1058065480407:web:4225c4bcf453da81b30e92",
      },
      reactionText,
      primaryColors: generateArray(tailwindConfig.theme.extend.colors.primary),
      secondaryColors: generateArray(
        tailwindConfig.theme.extend.colors.secondary
      ),
    });
  }, [reactionText, slug]);

  return <div id="reactive_widget" />;
};

export default Reactive;
