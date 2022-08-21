SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cp $SCRIPT_DIR/package.json $SCRIPT_DIR/dist/package.json
cp $SCRIPT_DIR/Readme.md $SCRIPT_DIR/dist/Readme.md
cd $SCRIPT_DIR/dist
npm publish --access public
