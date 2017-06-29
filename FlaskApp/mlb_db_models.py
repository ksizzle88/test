


import sqlalchemy
from sqlalchemy import create_engine, Integer, Column, String, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


engine = create_engine("mysql://keith:goodhand@localhost/mlb_data")
db = engine.connect()
Base = declarative_base()


class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True)
    mlb_id = Column(Integer)
    first_name = Column(String(20))
    last_name = Column(String(20))
    

class Team(Base):
    __tablename__ = "teams"
    id = Column(Integer, primary_key=True)
    code = Column(String(3))


class Game(Base):
    __tablename__ = "games"
    id = Column(Integer, primary_key=True)
    mlb_id = Column(Integer)
    year = Column(Integer)
    month = Column(Integer)
    day = Column(Integer)
    home_team = Column(Integer, ForeignKey("teams.id"))
    away_team = Column(Integer, ForeignKey("teams.id"))


class Inning(Base):
    __tablename__ = "innings"
    id = Column(Integer, primary_key=True)
    game = Column(Integer, ForeignKey('games.id'))


class At_bat(Base):
    __tablename__ = "at_bats"
    id = Column(Integer, primary_key=True)
    inning = Column(Integer, ForeignKey("innings.id"))
    batter = Column(Integer, ForeignKey("players.id"))
    pitcher = Column(Integer, ForeignKey("players.id"))
    result = Column(String(30))


class Pitch(Base):
    __tablename__ = "pitches"
    id = Column(Integer, primary_key=True)
    at_bat = Column(Integer, ForeignKey("at_bats.id"))
  
    spin_rate= Column(Float)
    break_angle= Column(Float)
    pitch_type= Column(String(10))
    y0= Column(Float)
    ay= Column(Float)
    ax= Column(Float)
    az= Column(Float)
    end_speed= Column(Float)
    spin_dir= Column(Float)
    zone= Column(Integer)
    start_speed= Column(Float)
    pz= Column(Float)
    px= Column(Float)
    break_y= Column(Float)
    event_num= Column(Integer)
    type= Column(String(10))
    sz_bot= Column(Float)
    pfx_z= Column(Float)
    vy0= Column(Float)
    pfx_x= Column(Float)
    break_length= Column(Float)
    nasty= Column(Integer)
    z0= Column(Float)
    des= Column(String(50))
    x0= Column(Float)
    sz_top= Column(Float)
    type_confidence= Column(Float)
    y= Column(Float)
    x= Column(Float)
    vz0= Column(Float)
    vx0= Column(Float)


def create_all_tables(): 
    Base.metadata.create_all(bind=db)
  
def drop_all_tables():
    Base.metadata.drop_all(engine)