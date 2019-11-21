console.clear();
/*----------------- class implementation ------------- */
class subscriber<T> implements Observer<T> {
  constructor(private destination: Observer<T>) {}
  private closed = false;
  next(value) {
    if (!this.closed) this.destination.next(value);
  }
  error(error) {
    this.closed = true;
    this.destination.error(error);
  }
  complete() {
    this.closed = true;
    this.destination.complete();
  }
}
type teardown = () => void;

class Observable<T> {
  constructor(private init: (observer: Observer<T>) => teardown) {}
  subscribe(ob: Observer<T>) {
    subscriber: subscriber = new subscriber(ob);
    return this.init(subscriber);
  }
}

/*---------------------creation observable----------- */
const myobservable = new Observable(observer => {
  let i = 0;
  const id = setInterval(() => {
    observer.next(i++);
  }, 1000);

  return () => {
    console.log("tearing down");
    clearInterval(id);
    observer.complete();
    observer.next(2);
  };
});

/*---------observable execution -------------- */
let teardown1 = myobservable.subscribe({
  next(value) {
    console.log(value);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log("done");
  }
});

setTimeout(() => {
  teardown1();
}, 3200);
