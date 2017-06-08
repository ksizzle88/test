import pickle

def psave(a):
    pickle.dump(a, open("debug/save.p", "wb"))

def popen(a):
    return pickle.load("debug.save", wb)