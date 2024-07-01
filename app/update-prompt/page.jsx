// "use client";
// import { useEffect, useState } from "react";
// import { Suspense } from "react";

// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";

// import Form from "@components/Form";

// const EditPrompt = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const promptId = searchParams.get("id");

//   const [submitting, setSubmitting] = useState(false);
//   const [post, setPost] = useState({
//     prompt: "",
//     tag: "",
//   });

//   console.log(post);

//   useEffect(() => {
//     const getPromptDetails = async () => {
//       try {
//         const { data } = await axios.get(`/api/prompt/${promptId}`);
//         setPost({
//           prompt: data.prompt,
//           tag: data.tag,
//         });
//       } catch (error) {
//         console.error("Failed to fetch prompt details:", error);
//       }
//     };
//     if (promptId) getPromptDetails();
//   }, [promptId]);

//   const updatePrompt = async(e) => {
//     e.preventDefault()
//     setSubmitting(true)
//     if(!promptId) return alert('Missing promptId')

//     try {
//       const {data} = await axios.patch(`/api/prompt/${promptId}`,{
//         prompt : post.prompt,
//         tag: post.tag
//       })

//       if(data){
// setSubmitting(false)
//        router.push('/')
//   }
//   } catch (error) {
//       console.log(error);
//       setSubmitting(false)
//     }

//   }

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Form
//         type="Edit"
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={updatePrompt}
//       />
//     </Suspense>
//   );
// };

// export default EditPrompt;


"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  console.log(post);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const { data } = await axios.get(`/api/prompt/${promptId}`);
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Failed to fetch prompt details:", error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Missing promptId");

    try {
      const { data } = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag,
      });

      if (data) {
        setSubmitting(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
