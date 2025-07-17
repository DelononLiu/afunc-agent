CXX = g++
CXXFLAGS = -std=c++17 -Wall -Iinclude

SRC = src/add.cpp
TEST_SRC = tests/test_add.cpp

all: test

test: $(TEST_SRC) $(SRC)
	$(CXX) $(CXXFLAGS) -o test_add $(TEST_SRC) $(SRC)
	./test_add

clean:
	rm -f test_add