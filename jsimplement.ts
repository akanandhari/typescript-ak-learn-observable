console.clear();
interface Observer<T>
{
  next(value):void;
  error(err):void;
  complete():void;
}
// function akObservable(observer:Observer<number>)
// {
//   observer.next(1);
//   observer.next(2);
//   observer.error("err");
//   observer.complete();
// }

function akObservable(observer:Observer<number>)
{
 let i=0;
 const id=setInterval(()=>{observer.next(i++)},1000);
 return ()=>{clearInterval(id)}
}
const teardown=akObservable({next(value)
{
  console.log(value);
},
error(err)
{
  console.error(err);
},
complete(){
  console.log("done");
}
})

setTimeout(()=>{teardown()},3200)


