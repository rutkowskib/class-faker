SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cp $SCRIPT_DIR/package.json $SCRIPT_DIR/dist/package.json
cd $SCRIPT_DIR/dist
npm publish --access public
