git reset .
git checkout  .
git clean -fd .

rm -rf .afunc
cp -rf ../../afunc .afunc

rm CMakeLists.txt -rf
rm -rf _tmp_workspace/*
