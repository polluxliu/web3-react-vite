// import Card from "./Card";

// function My() {
//   const questionList = [
//     { id: "q1", title: "问卷1", isPublished: true },
//     { id: "q2", title: "问卷2", isPublished: true },
//     { id: "q3", title: "问卷3", isPublished: false },
//     { id: "q4", title: "问卷4", isPublished: false },
//   ];

//   function deleteQuestion(id: string) {}

//   return (
//     <>
//       <h1>问卷列表页</h1>
//       {questionList.map((question) => {
//         // const { id, title, isPublished } = question;
//         // return <My2 key={id} id={id} title={title} isPublished={isPublished} deleteQuestion={deleteQuestion} />;

//         const { id } = question;
//         return <Card key={id} {...question} deleteQuestion={deleteQuestion} />;

//         // return (
//         //   <div key={id} className="list-item">
//         //     <strong>{title}</strong>
//         //     &nbsp;
//         //     {isPublished ? (
//         //       <span style={{ color: "green" }}>已发布</span>
//         //     ) : (
//         //       <span>未发布</span>
//         //     )}
//         //     <button
//         //       onClick={() => {
//         //         edit(id);
//         //       }}
//         //     >
//         //       编辑问卷
//         //     </button>
//         //   </div>
//         // );
//       })}
//     </>
//   );
// }

// export default My;
